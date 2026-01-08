# GitHub Pages 部署和自定义域名绑定指南

## 第一部分：准备 GitHub 仓库

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `your-username.github.io` （例如：`shaofei-liu.github.io`）
   - 或者使用其他名称（例如：`portfolio`），GitHub Pages URL 将是 `your-username.github.io/portfolio`
4. 选择 Public（GitHub Pages 免费版本需要公开仓库）
5. 不要勾选 "Initialize this repository with a README"（如果本地已有代码）
6. 点击 "Create repository"

### 2. 将本地代码推送到 GitHub

在项目根目录执行以下命令：

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**注意：** 如果仓库名是 `your-username.github.io`，GitHub Pages URL 会是 `https://your-username.github.io`
如果仓库名是其他名称，URL 会是 `https://your-username.github.io/repo-name`

---

## 第二部分：配置项目支持 GitHub Pages

### 1. 安装 gh-pages 依赖

```bash
yarn add -D gh-pages
```

或者使用 npm：
```bash
npm install --save-dev gh-pages
```

### 2. 修改 package.json

在 `package.json` 中添加 `homepage` 字段：

```json
{
  "name": "react-portfolio",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://YOUR_USERNAME.github.io/REPO_NAME",
  ...
}
```

**重要：** 
- 如果仓库名是 `your-username.github.io`，使用：`"homepage": "https://your-username.github.io"`
- 如果仓库名是其他名称，使用：`"homepage": "https://your-username.github.io/repo-name"`

### 3. 验证部署脚本

确保 `package.json` 中有以下脚本：

```json
"scripts": {
  "predeploy": "yarn build && cp build/index.html build/404.html",
  "deploy": "gh-pages -d build"
}
```

---

## 第三部分：部署到 GitHub Pages

### 1. 构建并部署

```bash
yarn deploy
```

或者使用 npm：
```bash
npm run deploy
```

这个命令会：
1. 运行 `predeploy`：构建项目并复制 `index.html` 为 `404.html`（用于 React Router）
2. 运行 `deploy`：将 `build` 文件夹推送到 `gh-pages` 分支

### 2. 在 GitHub 上启用 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分：
   - **Branch**: 选择 `gh-pages`
   - **Folder**: 选择 `/ (root)`
5. 点击 **Save**

### 3. 等待部署完成

等待几分钟，然后访问您的网站：
- `https://YOUR_USERNAME.github.io` （如果仓库名是 username.github.io）
- `https://YOUR_USERNAME.github.io/REPO_NAME` （其他情况）

---

## 第四部分：绑定自定义域名

### 1. 准备 CNAME 文件

在项目的 `public` 文件夹中创建 `CNAME` 文件（注意：没有扩展名）

```bash
# 在项目根目录执行
echo "yourdomain.com" > public/CNAME
```

或者手动创建 `public/CNAME` 文件，内容为您的域名：
```
yourdomain.com
```

**注意：** 
- 如果只想使用 `www` 子域名：`www.yourdomain.com`
- 如果想同时支持主域名和 www，需要在 DNS 中配置（见下文）

### 2. 重新部署

```bash
git add public/CNAME
git commit -m "Add CNAME file for custom domain"
git push origin main
yarn deploy
```

### 3. 在 GitHub 上配置自定义域名

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Custom domain** 部分，输入您的域名（例如：`yourdomain.com`）
3. 勾选 **Enforce HTTPS**（推荐）
4. 点击 **Save**

### 4. 配置 DNS 记录

登录您的域名注册商（如 Namespace），添加以下 DNS 记录：

#### 选项 A：仅使用主域名（yourdomain.com）

添加以下记录：

**类型：A 记录**
- **名称**: `@` 或留空（表示主域名）
- **值（IPv4）**: 
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- **TTL**: 3600（或默认值）

添加 4 条 A 记录，每条使用一个 IP 地址。

#### 选项 B：同时支持 www 和主域名

**对于主域名（yourdomain.com）：**
添加 A 记录（同上）

**对于 www 子域名（www.yourdomain.com）：**
添加 CNAME 记录：
- **类型**: CNAME
- **名称**: `www`
- **值**: `YOUR_USERNAME.github.io` （替换为您的 GitHub 用户名）
- **TTL**: 3600

**同时，更新 public/CNAME 文件：**
```
yourdomain.com
www.yourdomain.com
```
或者只保留主域名：
```
yourdomain.com
```

### 5. 等待 DNS 传播

DNS 更改可能需要几分钟到 48 小时才能生效。通常：
- A 记录：几分钟到几小时
- CNAME 记录：通常较快

您可以使用以下工具检查 DNS 是否已生效：
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

### 6. 验证 HTTPS

1. 等待 DNS 生效后，GitHub 会自动为您的域名申请 SSL 证书
2. 这个过程可能需要几分钟到几小时
3. 在 GitHub Pages 设置中勾选 **Enforce HTTPS**
4. 访问 `https://yourdomain.com` 验证

---

## 常见问题

### 问题 1：部署后页面显示 404

**解决方案：**
- 确保 `package.json` 中的 `homepage` 字段正确
- 确保 `public/CNAME` 文件已创建并提交
- 检查 GitHub Pages 设置中源分支是否为 `gh-pages`

### 问题 2：React Router 路由不工作

**解决方案：**
- 确保 `predeploy` 脚本中有 `cp build/index.html build/404.html`
- 这样所有路由都会重定向到 `index.html`，由 React Router 处理

### 问题 3：自定义域名无法访问

**解决方案：**
- 检查 DNS 记录是否正确配置
- 确认 GitHub Pages 设置中已输入自定义域名
- 等待 DNS 传播完成（最多 48 小时）
- 检查 CNAME 文件是否在 `public` 文件夹中且已部署

### 问题 4：HTTPS 证书未生效

**解决方案：**
- 等待 GitHub 自动生成 SSL 证书（可能需要几小时）
- 确保域名已正确指向 GitHub Pages
- 在设置中启用 "Enforce HTTPS"

---

## 更新网站内容

每次修改代码后，重新部署：

```bash
git add .
git commit -m "Update portfolio"
git push origin main
yarn deploy
```

---

## 有用的链接

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [自定义域名配置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [React Router 在 GitHub Pages 中的配置](https://create-react-app.dev/docs/deployment/#github-pages)
