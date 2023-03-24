import axios from "axios";
import Product from "../models/product";

export const getAll = async (req, res) => {
    try {
        const data = await Product.find();
        console.log(data);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);

        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        // const { data } = await axios.post(`http://localhost:3000/products`, req.body);
        const data = await Product.create(req.body);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        // const { data } = await axios.put(
        //     `http://localhost:3000/products/${req.params.id}`,
        //     req.body
        // );

        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const data = await Product.findOneAndDelete({ _id: req.params.id });
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
