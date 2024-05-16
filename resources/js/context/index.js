import { create } from "zustand";

const initialState = {
    modal: {
        modalMasterPoolingResource: false,
        modalMasterMarital: false,
        modalSyncShippingOrder: false,
    },
    permissionUser: [],
    pageTitle: "",
    users: {},
};

const createStore = create((set) => ({
    ...initialState,
    setTitle: (name) =>
        set((state) => ({
            ...state,
            pageTitle: name,
        })),
    handle: (name) => {
        set((state) => ({
            ...state,
            [name]: value,
        }));
    },
    handleModal: (name, value, items, type) =>
        set((state) => ({
            ...state,
            modal: {
                ...state.modal,
                [name]: value,
            },
            modalItem: items,
            typeModal: type != undefined ? type : state.typeModal,
        })),
}));

export default createStore;
