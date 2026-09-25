import { Request, Response } from "express";
import prisma from "../config/prisma";

export const listROI = async (req: Request, res: Response) => {
  try {
    const items = await prisma.industryROI.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch ROI data" });
  }
};

export const getROMAdmin = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      prisma.industryROI.findMany({
        skip,
        take: Number(limit),
        orderBy: { order: "asc" },
      }),
      prisma.industryROI.count(),
    ]);

    res.json({ success: true, items, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch ROI data" });
  }
};

export const createROI = async (req: Request, res: Response) => {
  try {
    const { industry, cvr, showUp, image, useCases, isActive, order } = req.body;

    if (!industry || !cvr || !showUp) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const item = await prisma.industryROI.create({
      data: {
        industry,
        cvr,
        showUp,
        image,
        useCases: Array.isArray(useCases) ? useCases : [],
        isActive,
        order,
      },
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create ROI entry" });
  }
};

export const updateROI = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { industry, cvr, showUp, image, useCases, isActive, order } = req.body;

    const item = await prisma.industryROI.update({
      where: { id },
      data: {
        ...(industry && { industry }),
        ...(cvr && { cvr }),
        ...(showUp && { showUp }),
        ...(image !== undefined && { image }),
        ...(useCases && { useCases: Array.isArray(useCases) ? useCases : [] }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update ROI entry" });
  }
};

export const deleteROI = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.industryROI.delete({ where: { id } });
    res.json({ success: true, message: "ROI entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete ROI entry" });
  }
};

export const reorderROI = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid IDs array" });
    }

    await Promise.all(
      ids.map((id, idx) =>
        prisma.industryROI.update({
          where: { id },
          data: { order: idx },
        })
      )
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reorder ROI entries" });
  }
};
