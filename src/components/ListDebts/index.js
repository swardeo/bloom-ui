import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    IconButton,
    TableContainer,
    TableCell,
    Table,
    TableRow,
    TableHead,
    TableBody,
    Typography,
    Paper,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
    Grid,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BackspaceIcon from '@material-ui/icons/Backspace';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { API } from 'aws-amplify';
import config from '../../config';
import { Redirect, useHistory } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    width: '650px',
}));

const StyledRemoveButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
}));

const NoDebts = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                You have not yet added any debts.
            </Typography>
            <Typography>To get started please add a new debt.</Typography>
        </>
    );
};

const ListDebts = ({ debts, handleEdit }) => {
    const [deleteDebt, setDeleteDebt] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [redirect, setRedirect] = useState('');
    const history = useHistory();

    const isDebts = debts.length > 0;
    const tableSize = useMediaQuery((theme) => theme.breakpoints.down('sm'))
        ? 'small'
        : 'medium';

    const handleCloseDelete = () => {
        if (!isDeleting) {
            setDeleteDebt('');
        }
    };

    const handleOpenDelete = (name) => {
        setDeleteDebt(name);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await API.del(config.api.NAME, `/debts/${deleteDebt}`, {
            body: {
                name: deleteDebt,
            },
        })
            .then(() => {
                setIsDeleting(false);
                setRedirect('/debts');
            })
            .catch(() => {
                setRedirect('/oops');
            });
    };

    const DeleteModal = () => {
        return (
            <Dialog onClose={handleCloseDelete} open={!!deleteDebt}>
                {!isDeleting ? (
                    <>
                        <DialogTitle onClose={handleCloseDelete}>
                            Delete Debt
                            <StyledCloseButton onClick={handleCloseDelete}>
                                <CloseIcon />
                            </StyledCloseButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography>
                                Are you sure that you want to delete debt{' '}
                                <strong>{deleteDebt}</strong>?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleDelete}>
                                Delete
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitle>Deleting Debt</DialogTitle>
                        <DialogContent>
                            <Grid container justify="center">
                                <CircularProgress />
                            </Grid>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        );
    };

    if (redirect === '/debts') {
        history.go(0);
    } else if (redirect) {
        return <Redirect to={redirect} />;
    }
    return isDebts ? (
        <>
            <StyledBox>
                <TableContainer component={Paper}>
                    <Table size={tableSize}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {debts.map((debt, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {debt.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {debt.startDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                            >
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleEdit(debt)
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <StyledRemoveButton
                                                    onClick={() =>
                                                        handleOpenDelete(
                                                            debt.name
                                                        )
                                                    }
                                                >
                                                    <BackspaceIcon />
                                                </StyledRemoveButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledBox>
            {deleteDebt && <DeleteModal />}
        </>
    ) : (
        <NoDebts />
    );
};

ListDebts.defaultProps = {
    debts: [],
    handleEdit: () => {},
};

ListDebts.propTypes = {
    debts: PropTypes.array,
    handleEdit: PropTypes.func,
};

export default ListDebts;
