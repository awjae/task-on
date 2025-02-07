# Node.js 이미지를 기반으로 합니다.
FROM node:20

# 작업 디렉토리를 설정합니다.
WORKDIR /apps

# 패키지 파일을 복사합니다.
COPY package*.json ./
# 의존성을 설치합니다.
RUN npm install --force
RUN npm install -g next --force

# 소스 코드를 복사합니다.
COPY apps/task-on/ ./apps/task-on/

# 실행 명령
CMD ["npx", "next", "start", "apps/task-on"]

EXPOSE 3000