import React from "react";

const OwnedContext = React.createContext();

export const OwnedProvider = OwnedContext.Provider;
export const OwnedConsumer = OwnedContext.Consumer;

export default OwnedContext;
