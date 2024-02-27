-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "account_number" BIGINT,
    "category" VARCHAR(255),
    "date" DATE,
    "description" TEXT,
    "mutation" DECIMAL(10,2),
    "note" TEXT,
    "total_amount_after" DECIMAL(10,2),
    "total_amount_before" DECIMAL(10,2),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

