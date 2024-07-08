import React, { PropsWithChildren } from 'react'
import { AlertDialog,AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogOverlay,AlertDialogPortal,AlertDialogTitle,AlertDialogTrigger } from '../ui/alert-dialog'


interface IProps extends PropsWithChildren {
    onConfirm: ()=> void
}
const ConfirmModal = ({children, onConfirm}: IProps) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure? </AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal