import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

const DialogWrapper = ({ open, setOpen, title, children, actions }) => (
    <Dialog open={open} handler={setOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>{actions}</DialogFooter>
    </Dialog>
);

export default DialogWrapper;