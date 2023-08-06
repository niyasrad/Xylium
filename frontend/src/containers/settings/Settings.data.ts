import { Actions, PopoverProps } from "../../components/popover/Popover"

export const emailPopover: PopoverProps = {
    label: "Enter your E-Mail",
    operation: Actions.email
}

export const passwordPopover: PopoverProps = {
    label: "Enter your Password",
    operation: Actions.pass
}

export const deletePopover: PopoverProps = {
    label: 'TYPE IN "DELETE" To Confirm',
    operation: Actions.del
}
