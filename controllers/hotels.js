import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHotels = async (req, res) => {
  try {
    const hotels = await prisma.hotels.findMany({
      include: {
        rooms: true,
      },
    });

    if (hotels.length === 0) {
      return res.status(200).json({ msg: "No hotels found" });
    }

    return res.json({ data: hotels });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createHotel = async (req, res) => {
    try {
      const { name, region, country, city, address, rooms } = req.body; // destructuring object
  
      const newHotel = await prisma.hotels.create({
        data: {
          name,
          region,
          country,
          city,
          address,
          rooms: {
            create: rooms,
          },
        },
        include: {
          rooms: true,
        },
      });
  
      return res.status(201).json({
        msg: "Hotel successfully created",
        data: newHotel,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const updateHotel = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, region, country, city, address } = req.body;
  
      let hotel = await prisma.hotels.findUnique({
        where: { id: Number(id) },
      });
  
      if (!hotel) {
        return res
          .status(201)
          .json({ msg: `No hotel with the id: ${id} found` });
      }
  
      hotel = await prisma.hotels.update({
        where: { id: Number(id) },
        data: { name, region, country, city, address },
      });
  
      return res.json({
        msg: `Hotel with the id: ${id} successfully updated`,
        data: hotel,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

const deleteHotel = async (req, res) => {
    try {
      const { id } = req.params;
  
      const hotel = await prisma.hotels.findUnique({
        where: { id: Number(id) },
      });
  
      if (!hotel) {
        return res
          .status(200)
          .json({ msg: `No hotel with the id: ${id} found` });
      }
  
      await prisma.rooms.deleteMany({
        where: { hotel_id: Number(id) },
      });
  
      await prisma.hotels.delete({
        where: { id: Number(id) },
      });
  
      return res.json({
        msg: `Hotel with the id: ${id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};
  
const getHotel = async (req, res) => {
    try {
      const { id } = req.params;
  
      const hotel = await prisma.hotels.findUnique({
        where: { id: Number(id) },
        include: {
          rooms: true
        }
      });
  
      if (!hotel) {
        return res
          .status(200)
          .json({ msg: `No hotel with the id: ${id} found` });
      }
  
      return res.json({
        data: hotel,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

export {
    getHotel, 
    getHotels, 
    createHotel,
    updateHotel,
    deleteHotel
  };
  