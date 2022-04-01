import { createContext, useState } from "react";

const UserContext = createContext({
    user: {},
    addUser: (user) => {},
});

export function UserContextProvider(props) {
    const [user, setUser] = useState({});

    function addUserHandler(u) {
        setUser(() => {
            return u;
        });
    };

    const context = {
        user: user,
        addUser: addUserHandler,
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;
