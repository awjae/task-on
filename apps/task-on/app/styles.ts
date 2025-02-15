import styled from 'styled-components';

// 전체 페이지 스타일 (필기노트 느낌 적용)
export const StyledPage = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #f6f5f0;
  min-height: 100vh;
  position: relative;
  
  .header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 32px;
      color: #2c3e50;
      text-decoration: underline;
      text-decoration-style: wavy;
      text-decoration-color: #e74c3c;
    }
  }

  .header-button {
    position: absolute;
    right: 20px;
    top: 20px;
    Button {
      min-width: 35px;
      height: 30px;
      padding-left: 4px; 
      padding-right: 4px; 
      background-color: #3498db;
      &:hover {
        background: #2980b9;
      }
    }
  }

  .todo-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    
    input {
      flex: 1;
      padding: 12px;
      border: none;
      border-bottom: 2px solid #95a5a6;
      border-radius: 0;
      font-size: 20px;
      background: transparent;
      
      &:focus {
        outline: none;
        border-bottom-color: #3498db;
      }
    }

    button {
      padding: 8px 16px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 18px;
      cursor: pointer;
      
      &:hover {
        background: #2980b9;
      }
    }
  }

  .todo-list {
    /* todo-item 컴포넌트가 들어올 영역 */
  }
`;

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  padding: 4px;
  background-color: white;
`;