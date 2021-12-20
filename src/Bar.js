import Web3 from 'web3';
import logo from './한강.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas } from 'react-bootstrap';


const Bar = () => {
    const [web3, setWeb3] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
            try {
                const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        handleShow();
    };
    return (
        <Navbar bg="secondary" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                    />
                    한강
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Auction">Auction</Nav.Link>
                        <Nav.Link href="/Collect">Collect</Nav.Link>
                        {
                        (  account == '0x6ffd74bac21fa086d645e6407f2e9bd19595b9e0'
                        || account == '0xcd2541a9ce07f673b0040802f7e4f2333d2fab28'
                        || account == '0xb85164C25D4BBfDA8c4e17348Ef955833e57f1e9'.toLowerCase())
                        ?(<Nav.Link href="/Create">Create</Nav.Link>)
                        :(<div></div>)
                        }
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Button
                variant="secondary"
                type="submit"
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                지갑이미지

            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mywallet</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    account: {account}
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
        

    );
};

export default Bar;
