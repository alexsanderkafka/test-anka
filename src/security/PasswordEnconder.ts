
import 'dotenv/config';
import bcrypt from "bcrypt";

export default abstract class PasswordEncoder{

    //private SALT_ROUNDS = 10;

    public static async hasPassword(password: string): Promise<string>{
        const salt: any = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    public static async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

}