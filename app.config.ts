import {defineConfig} from "@solidjs/start/config";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
    vite: {
        plugins: [suidPlugin()]
    }
});
