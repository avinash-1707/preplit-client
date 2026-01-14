import { authClient } from "@/lib/auth-client";
import { SessionUser } from "@/types/SessionUser";
import React, { useEffect, useState } from "react";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Image from "next/image";
import { LoaderOne } from "@/components/ui/loader";

function Profile({ user }: { user: SessionUser }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <Image
              src={user.image ?? "/default-avatar.png"}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-zinc-200 dark:border-zinc-800"
              width={100}
              height={100}
            />
            <div
              className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-zinc-50 dark:border-zinc-950 ${
                user.emailVerified
                  ? "bg-emerald-500"
                  : "bg-zinc-400 dark:bg-zinc-600"
              }`}
            ></div>
          </div>

          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            {user.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {/* Email */}
            <div className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-50">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Verification */}
            <div className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Shield className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                    Verification Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-900 dark:text-zinc-50">
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        user.emailVerified
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {user.emailVerified ? "Active" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Created */}
            <div className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                    Account Created
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-50">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                    Last Updated
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-50">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-8">
          Profile information is managed by your account settings
        </p>
      </div>
    </div>
  );
}

export default Profile;
