# 使用指定的 Node.js 镜像
FROM node:14.21-bullseye

# 设置工作目录
WORKDIR /app

# 安装 git 并清理缓存
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# 克隆 GitHub 仓库并移动文件到工作目录
RUN git clone https://github.com/del-barr/xunqiapp.git /tmp/xunqiapp && \
    mv /tmp/xunqiapp/* /app/ && \
    rm -rf /tmp/xunqiapp

# 安装项目依赖
RUN npm install

# 暴露应用运行的端口
EXPOSE 7958

# 启动应用
CMD ["node", "index.js"]
