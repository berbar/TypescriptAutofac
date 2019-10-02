
import * as gulpbabel from "gulp-babel";

export class CBabelHelper
{
    public GetCompiler()
    {
        let babelCompiler = gulpbabel({
            presets: ['@babel/env'],
            plugins: [
                "@babel/plugin-transform-for-of",
                "@babel/plugin-transform-typeof-symbol"
            ]
        });
        return babelCompiler;
    }
}

