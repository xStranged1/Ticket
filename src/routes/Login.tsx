import { Alert, Button, Input, InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

export default function Login() {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const UserSchema = z.object({
        email: z.string().email().min(5, { message: "El email debe ser valido" }),
        password: z.string().min(8, { message: "La contraseña debe tener 8 caracteres o mas" })
    }).required();



    type UserSchema = z.infer<typeof UserSchema>;


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(UserSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };


    const arr = [1, 4, 2122]

    arr[1] = 1

    return (
        <div>
            <h1>Login</h1>
            <Button onClick={handleClick}>Open Snackbar</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <Input value={register('email')} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div>
                    <label>Contraseña:</label>


                    <input type="password" {...register('password')} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type="submit">Enviar</button>
            </form>

            <Button variant="contained">Hello world</Button>
            <Link to='/tickets'>Ir a tickets</Link>
        </div>
    )
}
