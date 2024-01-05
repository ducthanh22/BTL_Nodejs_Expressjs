-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 31, 2023 lúc 05:02 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `achino`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Quần áo nam', '2023-12-30 14:03:19', '2023-12-30 14:03:19'),
(2, 'Quần áo nữ', '2023-12-30 14:03:31', '2023-12-30 14:03:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `ColorName` varchar(255) DEFAULT NULL,
  `Id_product` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `colors`
--

INSERT INTO `colors` (`id`, `ColorName`, `Id_product`, `createdAt`, `updatedAt`) VALUES
(1, 'Trắng', 2, '2023-12-30 14:10:37', '2023-12-30 14:10:37'),
(2, 'Trắng', 1, '2023-12-30 15:11:53', '2023-12-30 15:11:53'),
(3, 'Đen Đỏ', 3, '2023-12-30 14:18:40', '2023-12-30 14:18:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `Id_user` int(11) DEFAULT NULL,
  `Id_product` int(11) DEFAULT NULL,
  `Id_news` int(11) DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_exportbills`
--

CREATE TABLE `detail_exportbills` (
  `id` int(11) NOT NULL,
  `IdExportbill` int(11) DEFAULT NULL,
  `Idproduct` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_exportbills`
--

INSERT INTO `detail_exportbills` (`id`, `IdExportbill`, `Idproduct`, `Price`, `Quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 350000, 1, '2023-12-30 14:37:34', '2023-12-30 14:37:34'),
(2, 1, 2, 350000, 1, '2023-12-30 14:37:34', '2023-12-30 14:37:34'),
(3, 1, 3, 1200000, 2, '2023-12-30 14:37:34', '2023-12-30 14:37:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_importbills`
--

CREATE TABLE `detail_importbills` (
  `id` int(11) NOT NULL,
  `IdImportbillId` int(11) DEFAULT NULL,
  `Idproduct` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_importbills`
--

INSERT INTO `detail_importbills` (`id`, `IdImportbillId`, `Idproduct`, `Price`, `Quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 350000, 1, '2023-12-31 15:47:29', '2023-12-31 15:47:29'),
(2, 8, 1, 2, 2, '2023-12-31 15:59:39', '2023-12-31 15:59:39'),
(3, 8, 2, 2, 2, '2023-12-31 15:59:39', '2023-12-31 15:59:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_warehouses`
--

CREATE TABLE `detail_warehouses` (
  `id` int(11) NOT NULL,
  `Idwarehouse` int(11) DEFAULT NULL,
  `Idproduct` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exportbills`
--

CREATE TABLE `exportbills` (
  `id` int(11) NOT NULL,
  `Id_customer` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `exportbills`
--

INSERT INTO `exportbills` (`id`, `Id_customer`, `Price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3100000, '2023-12-30 14:37:34', '2023-12-30 14:37:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `importbills`
--

CREATE TABLE `importbills` (
  `id` int(11) NOT NULL,
  `Id_customer` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `importbills`
--

INSERT INTO `importbills` (`id`, `Id_customer`, `Price`, `createdAt`, `updatedAt`) VALUES
(1, 2, 350000, '2023-12-31 15:46:53', '2023-12-31 15:46:53'),
(2, 1, 50, '2023-12-31 15:47:42', '2023-12-31 15:47:42'),
(3, 1, 2560, '2023-12-31 15:48:45', '2023-12-31 15:48:45'),
(4, 1, 128, '2023-12-31 15:56:32', '2023-12-31 15:56:32'),
(5, 1, 64, '2023-12-31 15:56:47', '2023-12-31 15:56:47'),
(6, 1, 25, '2023-12-31 15:58:14', '2023-12-31 15:58:14'),
(7, 1, 25, '2023-12-31 15:58:34', '2023-12-31 15:58:34'),
(8, 1, 8, '2023-12-31 15:59:39', '2023-12-31 15:59:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Content` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `Id_customer` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `Id_customer`, `status`, `Price`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 3100000, 'dfv', '2023-12-30 14:36:31', '2023-12-30 14:37:34'),
(2, 2, 0, 350000, 'dfv', '2023-12-30 16:07:59', '2023-12-30 16:07:59'),
(3, 3, 0, 350000, 'Hưng Yên', '2023-12-30 17:05:03', '2023-12-30 17:05:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `Id_Order` int(11) DEFAULT NULL,
  `Id_product` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `Id_Order`, `Id_product`, `Quantity`, `Price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 350000, '2023-12-30 14:36:31', '2023-12-30 14:36:31'),
(2, 1, 2, 1, 350000, '2023-12-30 14:36:31', '2023-12-30 14:36:31'),
(3, 1, 3, 2, 1200000, '2023-12-30 14:36:31', '2023-12-30 14:36:31'),
(4, 2, 2, 1, 350000, '2023-12-30 16:07:59', '2023-12-30 16:07:59'),
(5, 3, 1, 1, 350000, '2023-12-30 17:05:03', '2023-12-30 17:05:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `permission_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `Id_product` int(11) DEFAULT NULL,
  `Price_product` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `prices`
--

INSERT INTO `prices` (`id`, `Id_product`, `Price_product`, `createdAt`, `updatedAt`) VALUES
(1, 1, 370000, '2023-12-30 14:08:20', '2023-12-31 10:32:51'),
(2, 2, 350000, '2023-12-30 14:10:37', '2023-12-30 14:10:37'),
(3, 3, 1250000, '2023-12-30 14:18:40', '2023-12-31 10:33:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `produces`
--

CREATE TABLE `produces` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `produces`
--

INSERT INTO `produces` (`id`, `Name`, `Address`, `Email`, `createdAt`, `updatedAt`) VALUES
(1, 'H&M', 'China', 'H&M@gmail.com', '2023-12-30 13:59:50', '2023-12-30 14:34:44'),
(2, 'ARTINO', 'USA', 'ARTINO@gmail.com', '2023-12-30 14:02:46', '2023-12-30 14:02:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Idcategories` int(11) DEFAULT NULL,
  `Idproduces` int(11) DEFAULT NULL,
  `Describe` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `Name`, `Idcategories`, `Idproduces`, `Describe`, `Image`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo Hoodie Nam Nữ trơn form rộng ', 1, 1, '<p>Áo hoodie nỉ bông BLACK OF EXIT nam nữ form rộng thu đông Local Brand</p><p>- Hàng chuẩn BLACK OF EXIT sản xuất, tem mác chuẩn chính hãng.</p><p>- Chất liệu: nỉ bông cotton 100% dày dặn, hạn chết bám lông</p><p>- Mũ to 2 lớp cao cấp</p><p>- Dệt bo tay,', '1704018771806_a3.png', '2023-12-30 14:08:20', '2023-12-31 10:32:51'),
(2, 'Áo Hoodie Nam Nữ trơn form rộng ', 1, 1, '<p>Áo hoodie nỉ bông BLACK OF EXIT nam nữ form rộng thu đông Local Brand</p><p>- Hàng chuẩn BLACK OF EXIT sản xuất, tem mác chuẩn chính hãng.</p><p>- Chất liệu: nỉ bông cotton 100% dày dặn, hạn chết bám lông</p><p>- Mũ to 2 lớp cao cấp</p><p>- Dệt bo tay,', '1703957818161_a2.png', '2023-12-30 14:10:37', '2023-12-30 17:36:58'),
(3, 'Áo Hoodie Nam Nữ trơn form rộng 3', 1, 1, '<p>Áo hoodie nỉ bông BLACK OF EXIT nam nữ form rộng thu đông Local Brand</p><p>- Hàng chuẩn BLACK OF EXIT sản xuất, tem mác chuẩn chính hãng.</p><p>- Chất liệu: nỉ bông cotton 100% dày dặn, hạn chết bám lông</p>', '1704018829431_a5.png', '2023-12-30 14:18:40', '2023-12-31 10:33:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rolepermissions`
--

CREATE TABLE `rolepermissions` (
  `id` int(11) NOT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231211063448-create-categories.js'),
('20231211063642-create-color.js'),
('20231211064257-create-detail-exportbill.js'),
('20231211064424-create-detail-importbill.js'),
('20231211064506-create-detail-warehouse.js'),
('20231211064631-create-exportbill.js'),
('20231211064654-create-importbill.js'),
('20231211064908-create-order.js'),
('20231211065035-create-order-detail.js'),
('20231211065237-create-price.js'),
('20231211065409-create-produces.js'),
('20231211065549-create-products.js'),
('20231211065736-create-warehouse.js'),
('20231217070359-create-users.js'),
('20231217070504-create-roles.js'),
('20231217070619-create-permissions.js'),
('20231217070716-create-user-roles.js'),
('20231217070750-create-role-permissions.js'),
('20231228165755-create-size.js'),
('20231230082240-create-news.js'),
('20231230082514-create-comment.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `NameSize` varchar(255) DEFAULT NULL,
  `Id_product` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sizes`
--

INSERT INTO `sizes` (`id`, `NameSize`, `Id_product`, `createdAt`, `updatedAt`) VALUES
(1, 'M', 1, '2023-12-30 14:08:20', '2023-12-30 14:08:20'),
(2, 'XL', 2, '2023-12-30 14:10:37', '2023-12-31 10:32:51'),
(3, 'S', 3, '2023-12-30 14:18:40', '2023-12-31 10:32:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userroles`
--

CREATE TABLE `userroles` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sdt` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `name`, `address`, `sdt`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '123', 'ádgrf', 'Admin', 'sadfg', 1234654, 2, '2023-12-30 15:22:52', '2023-12-30 15:22:52'),
(2, 'Thanh', '123', 'SA', 'Phí Đức Thanh', 'dfv', 1958146, 1, '2023-12-30 15:23:32', '2023-12-30 15:23:32'),
(3, 'Luan', '123', 'Luan@gmail.com', 'Đinh Thành Luân', 'Hưng Yên', 1958146, 1, '2023-12-30 18:02:59', '2023-12-30 18:02:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warehouses`
--

CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `detail_exportbills`
--
ALTER TABLE `detail_exportbills`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `detail_importbills`
--
ALTER TABLE `detail_importbills`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `detail_warehouses`
--
ALTER TABLE `detail_warehouses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `exportbills`
--
ALTER TABLE `exportbills`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `importbills`
--
ALTER TABLE `importbills`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `produces`
--
ALTER TABLE `produces`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `detail_exportbills`
--
ALTER TABLE `detail_exportbills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `detail_importbills`
--
ALTER TABLE `detail_importbills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `detail_warehouses`
--
ALTER TABLE `detail_warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `exportbills`
--
ALTER TABLE `exportbills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `importbills`
--
ALTER TABLE `importbills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `produces`
--
ALTER TABLE `produces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `rolepermissions`
--
ALTER TABLE `rolepermissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `userroles`
--
ALTER TABLE `userroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
