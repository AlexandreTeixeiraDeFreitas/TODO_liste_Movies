// controllers/ProductController.ts
import { Request, Response } from "express";
import Models from '../models/indexModels';

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
        const { name, description, price } = req.body;
        const user = await Models.User.findById(req.user);
        const product = new Models.Product({ name, description, price, user });
        await product.save();

        res.status(201).send(product);
    } catch (error: any) {
        res.status(500).send({ message: error.message || "An unknown error occurred" });
    }
  }

  static async getProductsByUser(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
        }
        const user = await Models.User.findById(req.user);
        if (!user) {
            return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
        }
        const userId = user.id;
        const products = await Models.Product.find({ userId });
        res.send(products);
    } catch (error: any) {
        res.status(500).send({ message: error.message || "An unknown error occurred" });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const updates = req.body;

      const product = await Models.Product.findByIdAndUpdate(productId, updates, { new: true });
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send(product);
    } catch (error: any) {
      res.status(500).send({ message: error.message || "An unknown error occurred" });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Models.Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).send({ message: error.message || "An unknown error occurred" });
    }
  }
}
