import { useEffect, useState } from "react";
import {
    Alert,
    Col,
    Container,
    Row,
    Spinner,
    Stack,
    Modal,
    Button,
} from "react-bootstrap";
import { GetAllFavourites, DeleteFavourites } from "../api/apiFavourites";
import { getThumbnail } from "../api";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const FavoritePage = () => {
    const [favourites, setFavourites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(null);

    const handleClose = () => {
        setIndex(null);
        setShow(false);
    }
    const handleShow = (idx) => {
        setIndex(idx);
        setShow(true);
    }
    const deleteBtn = {
        width: "35px",
        padding: "1px",
        borderRadius: "5px",
        backgroundColor: "red",
        marginTop: "20px",
        border: "none",
    };

    const deleteHandler = () => {
        setIsLoading(true);
        DeleteFavourites(index)
            .then((response) => {
                // setIsLoading(false);
                toast.success(response.message);
                setIndex(null);
                handleClose();
                fetchFavourites();
            })
            .catch((err) => {
                console.log(err);
                handleClose();
                // setIsLoading(false);
                toast.dark(JSON.stringify(err.message));
            });
    };

    const fetchFavourites = () => {
        setIsLoading(true);
        GetAllFavourites()
            .then((data) => {
                setFavourites(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchFavourites();
    }, []);
    return (
        <Container className="mt-4">
            <Stack direction="horizontal" gap={3} className="mb-3">
                <h1 className="h4 fw-bold mb-0 text-nowrap">My Favorite Video</h1>
                <hr className="border-top border-light opacity-50 w-100" />
            </Stack>
            {isLoading ? (
                <div className="text-center">
                    <Spinner
                        as="span"
                        animation="border"
                        variant="primary"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                    />
                    <h6 className="mt-2 mb-0">Loading...</h6>
                </div>
            ) : favourites?.length > 0 ? (
                <Row>
                    {favourites?.map((favourite, index) => (
                        <Col md={6} lg={4} className="mb-3" key={favourite.id}>
                            <div
                                className="card text-white"
                                style={{ aspectRatio: "16 / 9" }}
                            >
                                <img
                                    src={getThumbnail(favourite.thumbnail)}
                                    className="card-img w-100 h-100 object-fit-cover bg-light"
                                    alt="..."
                                />
                                <div className="card-body d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title text-truncate">
                                            {favourite.title}
                                        </h5>
                                        <p className="card-text">{favourite.description}</p>
                                    </div>
                                    <button
                                        style={deleteBtn}
                                        onClick={() => handleShow(favourite.id)}
                                        //onClick={() => deleteHandler(favourite.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="dark" className="text-center">
                    Tidak ada video untukmu saat ini ☹️
                </Alert>
            )}

            <Modal show={show} onHide={handleClose}>

                <Modal.Body>Apakah kamu yakin ingin menghapus video ini dari favorit?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler()}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
export default FavoritePage;
