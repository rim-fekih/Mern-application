import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import Controls from "../controls/Controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import InfoRounded from '@material-ui/icons/InfoOutlined';


const useStyles = makeStyles(theme => (
    {
        dialog: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(5)
        },
        dialogTitle: {
            textAlign: 'center'
        },
        dialogContent: {
            textAlign: 'center'
        },
        dialogAction: {
            justifyContent: 'center',
            textAlign: 'center'
        },
        titleIcon: {
            left: '30%',
            color: theme.palette.primary.main,
            '& .MuiSvgIcon-root': {
                fontSize: '8rem',
            }
        }
    }))

export default function SupportDialog(props) {

const {supportDialog, setSupportDialog} = props;
const classes = useStyles();
    return (
        <Dialog open={supportDialog.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle className= {classes.dia}>
                <IconButton disableRipple className = {classes.titleIcon}>
                    <InfoRounded/>
                </IconButton>
            </DialogTitle>
            <DialogContent className= {classes.dialogContent}>
                <Typography variant = "h6">
                    {supportDialog.title}
                </Typography>
                <Typography variant = "subtitle2">
                    {supportDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions classes= {classes.DialogAction}>
            <Controls.Button
            text = "D'accord"
            color = "primary"
            onClick={()=>setSupportDialog({...supportDialog, isOpen:false})}/>
            </DialogActions>
        </Dialog>
    )
}
