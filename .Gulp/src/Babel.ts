
import * as gulpbabel from "gulp-babel";

export class CBabelHelper
{
    public GetCompiler()
    {
        let babelCompiler = gulpbabel({
            presets: ['@babel/preset-env'],
            plugins: [
                <any>["@babel/plugin-transform-for-of", { loost: true } ],
                <any>["@babel/plugin-transform-typeof-symbol", { loost: true } ],
            ],
        });
        return babelCompiler;
    }
}

