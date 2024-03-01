'use client'
import { Component, cloneElement, useState } from "react";

export function Modal({ children, isModalOpen, setIsModalOpen }) {
    const hideModal = () => {
        document.body.classList.remove("overflow-hidden")
        setIsModalOpen(false);
    }

    const handleCloseModal = (e) => {
        if (isModalOpen && e.target.id === "outsideModal") {
            hideModal();
        }
    };

    const showModal = () => {
        document.body.classList.add("overflow-hidden")
        setIsModalOpen(true)
    }

    return (
        <div
            id="outsideModal"
            onClick={handleCloseModal}
            className={`fixed inset-0 w-full min-h-screen max-h-screen overflow-hidden bg-black bg-opacity-60 z-[1000] transition-all duration-200 ease-in-out 
             ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            {children}
        </div>
    )
}

export default class Modal2 extends Component {
    constructor(props) {
        super(props);
        this.state = false;
    }

    hideModal = () => {
        this.setState = false;
    }

    showModal = () => {
        this.setState = true;
    }

    render() {
        const { children: propsChildren } = this.props;


        return(
            <div className="inset-0 flex bg-red-900">
                <p>Hola</p>
            {cloneElement(children, {showModal, hideModal} )}
            </div>
        )
    }
}