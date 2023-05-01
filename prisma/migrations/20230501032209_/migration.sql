-- CreateTable
CREATE TABLE "Hotels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hotel_id" INTEGER NOT NULL,
    "room_type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "Rooms_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
