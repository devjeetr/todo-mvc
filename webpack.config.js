const HtmlWebPackPlugin = require("html-webpack-plugin");
const GoogleFontsPlugin = require("google-fonts-plugin");

module.exports = {
  entry: "./src/js/index.js",
	module: {
		rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: "eslint-loader",
          options: {
            emitWarning: true
          }
        }
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: {minimize: true}
				}
			},
			{
				test: /\.s?css$/,
				use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        }
      }
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/html/index.html",
			filename: "./index.html"
    }),
    new GoogleFontsPlugin({
      fonts: [
          { family: "Source Sans Pro" },
          { family: "Roboto", variants: [ "400", "700italic" ] },
          { family: 'Charmonman' }
      ]
    }),
	],
	devtool: "source-map"
}
