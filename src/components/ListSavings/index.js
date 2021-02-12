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

const NoSavings = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                You have not yet added any savings.
            </Typography>
            <Typography>To get started please add a new saving.</Typography>
        </>
    );
};

const ListSavings = ({ savings, handleEdit }) => {
    const [deleteSaving, setDeleteSaving] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [redirect, setRedirect] = useState('');
    const history = useHistory();

    const isSavings = savings.length > 0;
    const tableSize = useMediaQuery((theme) => theme.breakpoints.down(''))
        ? 'small'
        : 'medium';

    const handleCloseDelete = () => {
        if (!isDeleting) {
            setDeleteSaving('');
        }
    };

    const handleOpenDelete = (name) => {
        setDeleteSaving(name);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await API.del(config.api.NAME, `/savings/${deleteSaving}`, {
            body: {
                name: deleteSaving,
            },
        })
            .then(() => {
                setIsDeleting(false);
                setRedirect('/savings');
            })
            .catch(() => {
                setRedirect('/oops');
            });
    };

    const DeleteModal = () => {
        return (
            <Dialog onClose={handleCloseDelete} open={!!deleteSaving}>
                {!isDeleting ? (
                    <>
                        <DialogTitle onClose={handleCloseDelete}>
                            Delete Saving
                            <StyledCloseButton onClick={handleCloseDelete}>
                                <CloseIcon />
                            </StyledCloseButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography>
                                Are you sure that you want to delete saving{' '}
                                <strong>{deleteSaving}</strong>?
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
                        <DialogTitle>Deleting Saving</DialogTitle>
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

    if (redirect === '/savings') {
        history.go(0);
    } else if (redirect) {
        return <Redirect to={redirect} />;
    }
    return isSavings ? (
        <>
            <StyledBox>
                <TableContainer component={Paper}>
                    <Table size={tableSize}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {savings.map((saving, index) => (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {saving.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {saving.startDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            {saving.endDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                            >
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleEdit(saving)
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <StyledRemoveButton
                                                    onClick={() =>
                                                        handleOpenDelete(
                                                            saving.name
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
            {deleteSaving && <DeleteModal />}
        </>
    ) : (
        <NoSavings />
    );
};

ListSavings.defaultProps = {
    savings: [],
    handleEdit: () => {},
};

ListSavings.propTypes = {
    savings: PropTypes.array,
    handleEdit: PropTypes.func,
};

export default ListSavings;
