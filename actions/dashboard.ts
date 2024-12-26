"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

interface Transaction {
  balance?:{toNumber:()=>number}
  [key:string]:any
}
const serializedTransaction = (obj:Transaction) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized?.balance = obj.balance.toNumber();
  }
};

const createAccount = async (data) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }
    const existingAccount = await db.account.findMany({
      where: { userId: user.id },
    });
    const shouldBeDefault =
      existingAccount.length === 0 ? true : data.isDefault;
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }
    const accounts = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });
    const serializedAccount = serializedTransaction(accounts);
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createAccount;