# MartNow Backend API

Backend API cho nền tảng MartNow, được xây dựng với NestJS framework.

## 🏗️ Kiến trúc

Backend sử dụng kiến trúc modular với các modules độc lập:

```
src/
├── account/          # Quản lý tài khoản
│   ├── user/        # User entity & service
│   ├── buyer/       # Buyer entity
│   └── seller/      # Seller entity
├── auth/            # Authentication & Authorization
├── product/         # Quản lý sản phẩm
├── order/           # Xử lý đơn hàng
├── payment/         # Tích hợp thanh toán VNPay
├── review/          # Đánh giá sản phẩm
├── favorite/        # Sản phẩm yêu thích
├── blog/            # Hệ thống blog
├── media/           # Upload file (Cloudinary)
├── seller-stats/    # Thống kê người bán
├── lib/             # Shared utilities
└── shared/          # Shared types & enums
```

## 🔧 Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL
- **ORM**: TypeORM 0.3
- **Authentication**: Supabase Auth (JWT)
- **Payment Gateway**: VNPay (nestjs-vnpay)
- **File Storage**: Cloudinary (nestjs-cloudinary)
- **Validation**: class-validator, class-transformer
- **Caching**: cache-manager
- **Rate Limiting**: @nestjs/throttler
- **Scheduling**: @nestjs/schedule
- **Testing**: Jest

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

## ⚙️ Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/martnow

# Supabase Authentication
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# VNPay Payment Gateway
VNPAY_TMN_CODE=your_terminal_code
VNPAY_SECURE_SECRET=your_secure_secret
VNPAY_RETURN_URL=http://localhost:3000/payment/vnpay-return

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 🚀 Running the app

```bash
# Development
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 🗄️ Database

### Entities

#### User Management
- **User**: Thông tin người dùng cơ bản (id, email, name, role, avatar, address, phone)
- **Buyer**: Thông tin người mua (extends User)
- **Seller**: Thông tin người bán (extends User, có shopName, description)

#### Product Management
- **Product**: Sản phẩm (name, description, price, stock, category, images, ratings)
- **Category**: Danh mục sản phẩm

#### Order Management
- **Order**: Đơn hàng (buyer, totalPrice, status, note, paymentReference)
- **OrderItem**: Chi tiết đơn hàng (product, quantity, price)

#### Review System
- **Review**: Đánh giá sản phẩm (buyer, product, rating, comment, helpfulCount)

#### Favorite System
- **Favorite**: Sản phẩm yêu thích (buyer, product)

#### Blog System
- **Blog**: Bài viết blog (author, title, content, coverImage)
- **BlogComment**: Bình luận (user, blog, content)
- **BlogVote**: Vote bài viết (user, blog, voteType: UP/DOWN)

#### Analytics
- **SellerStats**: Thống kê người bán (totalRevenue, totalOrders, totalProducts)

### Migrations

TypeORM synchronize được bật trong development mode:

```typescript
synchronize: configService.get('NODE_ENV') === 'development'
```

Trong production, nên tắt synchronize và sử dụng migrations:

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```

### Seeding

```bash
# Seed database với dữ liệu mẫu
npm run seed
```

## 📡 API Endpoints

### Authentication (`/auth`)

```
POST   /auth/signup              # Đăng ký tài khoản mới
POST   /auth/signin              # Đăng nhập
POST   /auth/signout             # Đăng xuất
GET    /auth/profile             # Lấy thông tin profile
POST   /auth/refresh             # Refresh access token
POST   /auth/forgot-password     # Quên mật khẩu
POST   /auth/reset-password      # Reset mật khẩu
POST   /auth/change-password     # Đổi mật khẩu
POST   /auth/oauth/callback      # OAuth callback (Google)
DELETE /auth/user/:id            # Xóa tài khoản
```

### Users (`/users`)

```
GET    /users/:id                # Lấy thông tin user
PATCH  /users/:id                # Cập nhật thông tin user
```

### Products (`/product`)

```
GET    /product                  # Lấy danh sách sản phẩm (có filter, sort, pagination)
GET    /product/:id              # Lấy chi tiết sản phẩm
POST   /product                  # Tạo sản phẩm mới (Seller only)
PATCH  /product/:id              # Cập nhật sản phẩm (Seller only)
DELETE /product/:id              # Xóa sản phẩm (Seller only)
GET    /product/seller           # Lấy sản phẩm của seller hiện tại
GET    /product/seller/:id       # Lấy sản phẩm của seller theo ID
GET    /product/popular          # Lấy sản phẩm phổ biến
```

#### Query Parameters cho GET /product
- `categoryName`: Lọc theo danh mục
- `minPrice`, `maxPrice`: Lọc theo giá
- `search`: Tìm kiếm theo tên/mô tả
- `sortBy`: Sắp xếp (createdAt, price, averageRating, totalSold, viewCount)
- `sortOrder`: ASC hoặc DESC
- `page`: Trang hiện tại (default: 1)
- `limit`: Số sản phẩm mỗi trang (default: 20)

### Orders (`/order`)

```
POST   /order/checkout           # Checkout giỏ hàng
GET    /order/:id                # Lấy chi tiết đơn hàng
GET    /order/user/:userId       # Lấy đơn hàng của user
DELETE /order/cancel/:id         # Hủy đơn hàng
GET    /order/seller/:sellerId   # Lấy đơn hàng của seller
```

### Payment (`/payment`)

```
POST   /payment/create/:orderId  # Tạo payment URL
GET    /payment/vnpay-return     # VNPay callback
POST   /payment/vnpay-ipn        # VNPay IPN
GET    /payment/banks            # Lấy danh sách ngân hàng
```

### Reviews (`/reviews`)

```
GET    /reviews/product/:id      # Lấy reviews của sản phẩm
POST   /reviews                  # Tạo review mới
PATCH  /reviews/:id              # Cập nhật review
DELETE /reviews/:id              # Xóa review
GET    /reviews/product/:id/stats # Lấy thống kê rating
POST   /reviews/:id/helpful      # Đánh dấu review hữu ích
```

### Favorites (`/favorites`)

```
POST   /favorites/:productId/toggle  # Toggle favorite
GET    /favorites                    # Lấy danh sách favorites
GET    /favorites/:productId/check   # Kiểm tra favorite
GET    /favorites/:productId/count   # Đếm số lượt favorite
```

### Blogs (`/blogs`)

```
GET    /blogs                    # Lấy danh sách blogs
GET    /blogs/:id                # Lấy chi tiết blog
POST   /blogs                    # Tạo blog mới
PUT    /blogs/:id                # Cập nhật blog
DELETE /blogs/:id                # Xóa blog
GET    /blogs/:id/comments       # Lấy comments của blog
POST   /blogs/:id/comments       # Tạo comment
PUT    /blogs/comments/:id       # Cập nhật comment
DELETE /blogs/comments/:id       # Xóa comment
POST   /blogs/:id/vote           # Vote blog (up/down)
DELETE /blogs/:id/vote           # Unvote blog
```

### Sellers (`/sellers`)

```
GET    /sellers/profile          # Lấy profile seller hiện tại
PATCH  /sellers/profile          # Cập nhật profile seller
GET    /sellers/stats            # Lấy thống kê seller
GET    /sellers/orders           # Lấy đơn hàng của seller
GET    /sellers/user/:userId     # Lấy seller theo userId
GET    /sellers/:id/analytics    # Lấy analytics của seller
GET    /sellers/:id/orders       # Lấy orders của seller theo ID
```

### Media (`/media`)

```
POST   /media/avatar             # Upload avatar
POST   /media/products/:id       # Upload product images
POST   /media/upload             # Upload file chung
```

## 🔐 Authentication & Authorization

### JWT Authentication

Backend sử dụng Supabase Auth để xác thực:

1. Client gửi request với `Authorization: Bearer <access_token>`
2. `SupabaseAuthGuard` verify token với Supabase
3. User info được attach vào request: `req.user`

### Guards

- **SupabaseAuthGuard**: Verify JWT token
- **RoleGuard**: Kiểm tra role (BUYER/SELLER)
- **Public Decorator**: Bypass authentication cho public endpoints

### Usage

```typescript
// Protected endpoint
@UseGuards(SupabaseAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}

// Role-based access
@UseGuards(SupabaseAuthGuard, RoleGuard)
@Roles(UserRole.SELLER)
@Post('product')
createProduct(@Body() dto: CreateProductDto) {
  // Only sellers can access
}

// Public endpoint
@Public()
@Get('products')
getProducts() {
  // Anyone can access
}
```

## 💳 Payment Integration

### VNPay Flow

1. **Create Payment URL**
   ```typescript
   POST /payment/create/:orderId
   ```
   - Tạo order với status PENDING
   - Generate VNPay payment URL
   - Return URL cho client

2. **User Payment**
   - User redirect đến VNPay
   - Nhập thông tin thanh toán
   - VNPay xử lý payment

3. **Return URL**
   ```typescript
   GET /payment/vnpay-return?vnp_*
   ```
   - Verify payment signature
   - Update order status thành PAID
   - Trừ stock sản phẩm
   - Redirect user về success page

4. **IPN (Instant Payment Notification)**
   ```typescript
   POST /payment/vnpay-ipn
   ```
   - Backup verification từ VNPay
   - Đảm bảo payment được xử lý

## 📤 File Upload

### Cloudinary Integration

```typescript
// Upload avatar
POST /media/avatar
Content-Type: multipart/form-data
Body: { file: File }

// Upload product images
POST /media/products/:productId
Content-Type: multipart/form-data
Body: { files: File[] }
```

Files được upload lên Cloudinary với structure:
```
foodee/
├── users/
│   └── {userId}/
│       └── avatar/
├── products/
│   └── {productId}/
└── general/
```

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Structure

```
src/
├── auth/
│   └── test/
│       ├── auth.controller.spec.ts
│       ├── auth.service.spec.ts
│       └── guards.spec.ts
├── order/
│   └── test/
│       └── order.service.spec.ts
└── payment/
    └── test/
        └── payment.service.spec.ts
```

## 📊 Logging

NestJS Logger được sử dụng trong các services:

```typescript
private readonly logger = new Logger(ServiceName.name);

this.logger.log('Info message');
this.logger.warn('Warning message');
this.logger.error('Error message');
this.logger.debug('Debug message');
```

## 🔄 Caching

Cache manager được cấu hình cho các endpoints thường xuyên truy cập:

```typescript
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 minutes
@Get('popular')
getPopularProducts() {
  // Cached response
}
```

## 🚦 Rate Limiting

Throttler được cấu hình để prevent abuse:

```typescript
@Throttle({ default: { limit: 10, ttl: 60000 } })
@Post('login')
login() {
  // Max 10 requests per minute
}
```

## 📈 Performance Optimization

- **Database Indexing**: Indexes trên các foreign keys và search fields
- **Query Optimization**: Eager loading với relations
- **Caching**: Cache cho popular products và stats
- **Pagination**: Limit results với pagination
- **Connection Pooling**: PostgreSQL connection pool (max: 20)

## 🐛 Error Handling

Global exception filter xử lý errors:

```typescript
throw new NotFoundException('Product not found');
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Invalid credentials');
throw new ForbiddenException('Access denied');
```

Response format:
```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

## 🔒 Security

- **Helmet**: HTTP headers security
- **CORS**: Configured cho frontend domain
- **Rate Limiting**: Prevent brute force
- **Input Validation**: class-validator pipes
- **SQL Injection**: TypeORM parameterized queries
- **XSS**: Input sanitization
- **JWT**: Secure token-based auth

## 📝 Code Style

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix lint issues
npm run lint -- --fix
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Environment

- Set `NODE_ENV=production`
- Disable TypeORM synchronize
- Use migrations for schema changes
- Configure proper database connection pool
- Set up monitoring and logging
- Use process manager (PM2)

### Docker (Optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [VNPay Integration](https://sandbox.vnpayment.vn/apis/)
- [Cloudinary API](https://cloudinary.com/documentation)

