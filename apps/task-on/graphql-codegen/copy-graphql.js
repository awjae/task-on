const fs = require('fs');
const {glob} = require('glob');

(async () => {
const jsfiles = await glob('apps/task-on/src/app/api/graphql/type/*.ts');

jsfiles.forEach((file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${file}:`, err);
      return;
    }

    // data만 추출하려면
    const extractData = data.match(/gql`([\s\S]+?)`;/);
    const extractedData = extractData[1];

    // 출력 파일 경로 (파일명 그대로 저장)
    const outputFilePath = file.replace('.ts', '.graphql');

    // 변환된 TypeScript 코드 파일로 저장
    fs.writeFile(outputFilePath, extractedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to TypeScript file ${outputFilePath}:`, err);
      } else {
        console.log(`TypeScript file generated successfully at ${outputFilePath}`);
      }
    });
  });
});
})();
