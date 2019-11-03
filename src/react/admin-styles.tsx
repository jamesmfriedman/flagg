export default /* css */ `

.flaggly {
	text-align: left;
	position: relative;
	background-color: #f6f6f9;
	padding-bottom: 3rem;
	overflow-y: auto;
	max-height: 100vh;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.flaggly * {
	outline: none;
}

.flaggly-flag-icon {
	color: #f44436;
	margin-right: 0.5rem;
}

.flaggly-header {
	height: 4rem;
	line-height: 4rem;
	position: sticky;
	top: 0;
	background: black;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1.5rem;
	margin-bottom: 1rem;
	z-index: 3;
}

.flaggly-header .flaggly-flag-icon {
	position: relative;
	top: 4px;
}

.flaggly-header__name {
	font-size: 1.25rem;
	font-weight: bold;
	color: white;
	text-transform: uppercase;
	letter-spacing: 1px;
	display: inline-block;
	margin-right: 2rem;
}

.flaggly-header__lead {
	display: flex;
	flex: 1;
	align-items: center;
}

.flaggly-header__end {
	display: flex;
	align-items: center;
}

.flaggly-category--search {
	position: relative;
}

.flaggly-category--search:focus-within .flaggly-search-icon {
	color: #f44436;
}

.flaggly-search {
	height: 4rem;
	padding: 1rem;
	-webkit-appearance: none;
	font-size: 1.25rem;
	background: transparent;
	border: 0;
	flex: 1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	text-indent: 3rem;
}

.flaggly-search-icon {
	position: relative;
	top: 4px;
	transition: 0.3s;
}

.flaggly-categories {
	padding: 0 1rem;
	flex: 1;
}

.flaggly-category {
	padding: 1rem;
	box-shadow: 0 8px 24px rgba(0,0,0,.033);
	border-radius: 0.75rem;
	max-width: 50rem;
	margin: 1rem auto;
	background: white;
}

.flaggly-control {
	display: flex;
	align-items: center;
	flex: 1;
	margin-left: 0.5rem;
	justify-content: flex-end;
}

.flaggly-control .flaggly-flag-icon {
	transition: 0.2s;
	opacity: 0;
	transform: scale(0);	
}

.flaggly-control--override .flaggly-flag-icon {
	opacity: 1;
	transform: scale(1);
}

.flaggly-control--override .flaggly-flag-icon:hover {
	cursor: pointer;
	
}

.flaggly-zero {
	text-align: center;
	font-size: 2rem;
	padding: 4rem;
	opacity: 0.5;
}

.flaggly-category__name {
	text-transform: capitalize;
	font-size: 1.75rem;
	font-weight: bold;
	margin-bottom: 1rem;
}

.flaggly-button {
	-webkit-appearance: none;
	background: none;
	color: white;
	border: 0;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 500;
	letter-spacing: 1px;
	height: 2.25rem;
	margin: 0 0.5rem;
	cursor: pointer;
	border-radius: 0.1875rem;
}

.flaggly-button:hover, .flaggly-button:focus {
	background-color: rgba(255,255,255, 0.1);
}

.flaggly-flag {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	font-size: 1.25rem;
	margin: 0 -1rem;
	padding: 0.75rem 1rem;
	cursor: pointer;
}

.flaggly-flag > div:first-child {
	max-width: calc(100% - 7rem);
}

.flaggly-flag:hover {
	background-color: rgba(0,0,0,.05);
}

.flaggly-flag__category-name {
	opacity: 0.7;
}

.flaggly-flag__name {
	overflow: hidden;
	text-overflow: ellipsis;
}

.flaggly-flag__flag-name {
	font-weight: 500;
}

.flaggly-flag__description {
	font-size: 0.875rem;
	opacity: 0.7;
	margin-top: 0.25rem;
}

.flaggly-select {
	font-size: 1.25rem;
}

.flaggly-input {
	font-size: 1.25rem;
	text-align: center;
	line-height: 2rem;
	padding: 0 0.5rem;
	border-radius: 0.1875rem;
	border: 1px solid rgba(0,0,0,.2);
	width: 100%;
}

.flaggly-toggle {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 3.875rem;
	height: 2rem;
	display: inline-block;
	position: relative;
	border-radius: 3.125rem;
	overflow: hidden;
	outline: none;
	border: none;
	cursor: pointer;
	background-color: #A0A0A0;
	transition: background-color ease 0.3s;
	
}

.flaggly-toggle:before {
	content: "on off";
	display: block;
	position: absolute;
	z-index: 2;
	width: 1.75rem;
	height: 1.75rem;
	background: #fff;
	left: 2px;
	top: 2px;
	border-radius: 50%;
	font: 0.625rem/1.75rem Helvetica;
	text-transform: uppercase;
	font-weight: bold;
	text-indent: -1.375rem;
	word-spacing: 2.3125rem;
	color: #fff;
	white-space: nowrap;
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.flaggly-toggle:checked {
	background-color: limegreen;
}

.flaggly-toggle:checked:before {
	left: 2rem;
}

.flaggly-footer {
	text-align: center;
	font-size: 0.875rem;
	padding-top: 1rem;
}
`;
