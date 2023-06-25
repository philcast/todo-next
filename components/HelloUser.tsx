import { FC, PropsWithChildren } from 'react';

interface HelloUserProps {
  name: string;
}

const HelloUser: FC<PropsWithChildren<HelloUserProps>> = ({ children }) => {
  return (
    <div>
      <div>HelloUser</div>
      {children}
    </div>
  );
};

export default HelloUser;
