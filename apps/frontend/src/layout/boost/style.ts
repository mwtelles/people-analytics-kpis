import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #111;
  color: #eee;
`;

export const Header = styled.header`
  padding: 1rem 2rem;
  background: #000;
  font-weight: bold;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #000;
  color: #888;
  border-top: 1px solid #222;
`;
