import React from "react";

import { MainPresenter } from "./MainPresenter";
import { useNavigation } from "@react-navigation/native";

const MainContainer = () => {
    const navigation = useNavigation();

    return(
        <MainPresenter
            navigation = {navigation}
        />
    )
}

export default MainContainer;