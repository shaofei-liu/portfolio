# Dog Breed Classification - Portfolio Integration Guide

## 项目概述

已成功将犬种识别 AI 模型集成到 React Portfolio 项目中作为 **Portfolio Project 2**。

## 集成内容

### 1. HF Spaces 部署
- **地址**: https://huggingface.co/spaces/WilliamCass/dog-breed-classification
- **状态**: ✅ 运行中
- **框架**: Gradio + Docker
- **API**: RESTful endpoints

### 2. 前端集成

#### 新增文件
```
src/components/
├── DogBreedClassifier.jsx       # 主组件 (含多语言支持)
├── DogBreedClassifier.css        # 样式 (响应式设计)
└── dogBreedData.js               # 语言数据和配置
```

#### 修改文件
- `src/content_option.js` - 更新 project 2 配置，指向新组件
- `src/pages/portfolio/ProjectView.js` - 添加 project2 处理逻辑

### 3. 功能特性

#### 多语言支持 (EN/DE)
- **英文 (English)**: Dog Breed Classifier
- **德文 (Deutsch)**: Hunderasse-Klassifizierer
- 支持实时语言切换，所有标签和结果自动翻译
- 120 种犬种提供英文和德文名称

#### AI 模型功能
- Vision Transformer (ViT-B/16) 模型
- 120 种犬种识别
- 94-96% 准确度
- Top-5 预测结果
- 实时置信度显示

#### 用户界面
- 拖拽或点击上传图片
- 实时图片预览
- 美观的渐变设计 (紫色主题)
- 响应式布局 (支持手机/平板/桌面)
- 流畅的加载和结果动画
- 错误处理和用户反馈

#### API 支持
两种 API 源可选择：
1. **HF Spaces** (默认) - 云端部署，无需本地运行
2. **Local API** - localhost:8000，用于本地开发

### 4. 语言配置

#### 英文 UI 文本
```javascript
{
  title: "🐕 Dog Breed Classifier",
  description: "Upload a dog photo and AI will identify the breed",
  selectImage: "Choose image or drag file",
  predict: "Identify",
  // ... 更多
}
```

#### 德文 UI 文本
```javascript
{
  title: "🐕 Hunderassen-Klassifizierung",
  description: "Laden Sie ein Hunderfoto hoch und die KI identifiziert die Rasse",
  selectImage: "Bild wählen oder Datei ziehen",
  predict: "Identifizieren",
  // ... 更多
}
```

#### 犬种名称翻译
支持 120 种犬种的双语显示：
- Chihuahua → Chihuahua
- Golden Retriever → Golden Retriever
- German Shepherd → Deutscher Schäferhund
- Great Dane → Deutsche Dogge
- 等等...

### 5. 文件结构

```
dog-breed-classification/
├── app_spaces.py              # HF Spaces Gradio 应用
├── api_server.py              # FastAPI 后端 (本地开发)
├── Dockerfile                 # Docker 容器配置
├── requirements.txt           # Python 依赖
├── models/
│   ├── modeling.py            # Vision Transformer 模型
│   └── configs.py             # 模型配置
└── output/
    └── sample_run_checkpoint.bin  # 预训练模型 (需手动上传到 HF)

react-portfolio-master/
└── src/
    ├── components/
    │   ├── DogBreedClassifier.jsx
    │   ├── DogBreedClassifier.css
    │   └── dogBreedData.js
    ├── pages/
    │   └── portfolio/
    │       └── ProjectView.js      # 已更新
    └── content_option.js           # 已更新
```

## 部署流程

### 1. HF Spaces 部署 (已完成)
```bash
cd dog-breed-classification
git push space main
# 上传模型文件到 HF Spaces web UI
```

### 2. 本地开发
```bash
cd react-portfolio-master
npm install
npm start
# 访问 http://localhost:3000/portfolio/project2
```

## API 使用

### HF Spaces API
```bash
POST https://williamcass-dog-breed-classification.hf.space/api/predict/
Content-Type: multipart/form-data

files: <image_file>

Response:
{
  "breed": "Golden Retriever",
  "confidence": 0.9414,
  "top_5": {
    "Golden Retriever": 0.9414,
    "Labrador Retriever": 0.0321,
    ...
  }
}
```

### 本地 API
```bash
POST http://localhost:8000/api/predict
Content-Type: multipart/form-data

file: <image_file>
```

## 技术栈

### 前端
- React 18+
- JavaScript/JSX
- CSS3 (Flexbox, Grid, Animations)
- Responsive Design

### 后端
- Python 3.11
- PyTorch 2.10
- Vision Transformer (ViT-B/16)
- FastAPI + Gradio
- Docker

### 模型
- Stanford Dogs Dataset (120 breeds)
- Vision Transformer (ViT-B/16)
- Trained on 20K+ images
- Top-1 Accuracy: 94-96%

## 浏览器兼容性
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 移动浏览器 (iOS Safari, Chrome Mobile)

## 特殊说明

### 模型文件上传
因为模型文件 (340MB) 超过 Git 限制，需要：
1. 登录 HF Spaces
2. 进入 dog-breed-classification 空间
3. 点击 Files → Upload files
4. 上传 `output/sample_run_checkpoint.bin`

### 本地开发
若要在本地运行 API：
```bash
cd dog-breed-classification
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python api_server.py
```

然后在前端组件中选择 "Local API" 选项。

## 故障排除

### 问题：无法连接到 HF Spaces
**解决**: 
- 检查网络连接
- 确保 HF Space 已启动
- 查看浏览器控制台错误信息

### 问题：本地 API 连接失败
**解决**:
- 确保本地 API 服务已运行 (`python api_server.py`)
- 检查端口 8000 是否被占用
- 在前端选择 "HF Spaces API" 作为备选

### 问题：图片无法上传
**解决**:
- 确保选择的是图片文件 (JPG, PNG, etc.)
- 文件大小不超过 10MB
- 检查浏览器控制台的错误信息

## 未来改进建议

1. **性能优化**
   - 添加图片压缩
   - 实现结果缓存
   - 添加进度条显示

2. **功能扩展**
   - 支持更多语言 (FR, ES, ZH)
   - 添加犬种详情页面 (特征、历史、护理建议)
   - 支持摄像头实时识别
   - 添加识别历史记录

3. **UI/UX 改进**
   - 暗色主题支持
   - 更多主题选项
   - 动画和过渡效果优化
   - 无障碍访问改进

4. **后端增强**
   - 集成犬种数据库 API
   - 添加用户反馈机制
   - 实现识别历史追踪

## 联系方式

- GitHub: https://github.com/YourGithub/dog-breed-classification
- HF Hub: https://huggingface.co/WilliamCass/dog-breed-classification
- Email: shaofei.liu.tum@gmail.com

---

**最后更新**: 2026-01-30
**版本**: 1.0.0
**状态**: ✅ 生产就绪
