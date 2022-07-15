import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.section`
  padding: 1em;
  background: var(--clr-body-bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 1.5em;
  width: 100%;

  @media(min-width:900px ) {
    padding: 4em 8em;
    max-width: 1440px;
  }
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

export const Content = styled.p`
  max-width: 50ch;
  text-align: center;
  font-family: var(--ff-secondary);
  font-weight: var(--fw-reg);
  line-height: 1.5rem;
`;

export const StartButton = styled.button`

    &:hover,
    &:focus {
      background-color: var(--clr-highlight-secondary);
      color: var(--clr-button-bg);
    }
`;

const rotate = keyframes` 
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
    display:block;
    width: 100px;
    height: 100px;

    &:after {
      content: "";
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid var(--clr-highlight-secondary);
      border-color: var(--clr-highlight-secondary) transparent var(--clr-highlight-secondary) transparent;
      animation: ${rotate} 1.5s linear infinite;
    }
`;

export const DropdownWrapper = styled.section`
    display:flex;
    flex-direction: column;
    gap: 1em;
`;

export const SelectLabel = styled.label`

`;

export const SelectOptions = styled.select`
    font-family: var(--ff-secondary);
    font-weight: var(--fw-reg);
    font-size: 0.9rem;
    background-color: var(--clr-white);
    border: thin solid var(--clr-button-bg);
    border-radius: 5px;
    display:inline-block;
    line-height: 1em;
    padding: 10px;
    width:40ch;
`;