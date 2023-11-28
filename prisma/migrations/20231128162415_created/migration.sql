-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "otp_val" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '10 MINUTE',

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
