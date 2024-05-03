import Modal from 'react-bootstrap/Modal';

function Result({show ,setShow ,winner}) {

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>The Calculator  number  {winner + 1}  win the bus   </Modal.Body>
      </Modal>
    </>
  );
}

export default Result;