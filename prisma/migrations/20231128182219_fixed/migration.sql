-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expires_at" SET DEFAULT NOW() + interval '10 minute';
