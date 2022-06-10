import styled from "styled-components";

export default function ShoppingItem({ name }) {
  return (
    <>
      <ListItem className="listitem">{name}</ListItem>
    </>
  );
}

const ListItem = styled.li`
  border-style: outset;
`;
