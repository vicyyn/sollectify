module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
		spacing: {
			card: '17.5rem',
			'23rem': '23rem',
			'223125': '22.3125rem',
			'3125': '3.125rem'
		},
      fontFamily: {
        primary: ['SF Pro Text', 'sans-serif'],
        logo: ['GT Haptik', 'sans-serif'],
        raleway: ['raleway', 'sans-serif'],
        draleway: ['draleway', 'sans-serif'],
		quicksand: ['quicksand', 'sans-serif'],
      },
      boxShadow: {
        '4_4': '0px 0px 4px 4px rgba(0, 0, 0, 0.05)',
        '4_2': '0px 0px 4px 2px rgba(0, 0, 0, 0.05)',
        '10_4': '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
		'4_10_4': '0px 4px 10px 4px rgba(0, 0, 0, 0.05)',
		'14': '0px 0px 14px rgba(0, 0, 0, 0.3)',
      },
	  fontSize: {
		  '2rem': '2rem'
	  },
      colors: {
		  border: {
			  'card-light': 'rgba(35, 35, 35, 0.3)',
			  'card-dark': 'rgba(178, 178, 178, 0.3)',
		  },
		pink: '#D117E7',
        hovers: {
          white: '#F2F2F2',
          dark: '#383838',
		  pink: '#BE30DD',
          extra: '#61D4A3'
        },
        sollectify: {
          blue: '#00ADEF',
          indigo: '#92278F',
          pink: '#DC1FFF'
        },
        solana: {
          green: '#92278F',
        },
		light: {
			1: '#F0F0F0',
			2: '#959595',
			3: '#DBDBDB',
      4: '#F5F5F5',
      5: 'rgba(221, 221, 221, 0.9)',
      6: '#626262',
      hovered: '#9AFFE5'
		},
        dark: {
		  0: '#141416',
          1: '#131315',
          2: '#232323',
		  3: '#2B2B2C',
		  4: '#2A2A2C',
		  5: '#3F3F3F',
		  6: '#2E2E2E',
      7: '#808080',
      8: '#4D4D4D',
      hovered: 'rgba(247, 247, 247, 0.28)'
        },
        divider: {
          1: 'rgba(196, 196, 196, 0.1)',
          2: 'rgba(196, 196, 196, 0.2)'
        },
        extra: {
          1: '#00FFBD'
        }
      }
    },
  },
  variants: {
    extend: {
      display: ['dark']
    },
  },
  plugins: [],
}
