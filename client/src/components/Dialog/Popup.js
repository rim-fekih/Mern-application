import React from 'react';
import { Dialog,DialogContent, DialogTitle} from '@material-ui/core';

export default function Popup(props) {

    const { titile, children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open = {openPopup}>
            <DialogTitle>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
