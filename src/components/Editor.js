import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from 'react-select';
import RandomTheme from './RandomTheme';
import { ImgProvider } from '../utils/ImgContext'
import Header from "./Header";


import { THEMES } from "../utils/constants";

const defaultIcon = { 'label': 'react', 'value': 'react' }

const SIZE_PRESETS = [
	{ label: '16:9 (1280×720)', value: '16:9', width: '1280', height: '720' },
	{ label: '4:3 (1024×768)', value: '4:3', width: '1024', height: '768' },
	{ label: '16:10 (1280×800)', value: '16:10', width: '1280', height: '800' },
	{ label: '1:1 (800×800)', value: '1:1', width: '800', height: '800' },
	{ label: '3:2 (1200×800)', value: '3:2', width: '1200', height: '800' },
];

const defaultSettings = {
	title: "A beginners guide to frontend development",
	bgColor: "#949ee5",
	pattern: "",
	download: "WEBP",
	author: 'Rutik Wankhade',
	icon: defaultIcon,
	devIconOptions: [defaultIcon],
	font: 'font-Anek',
	theme: 'background',
	customIcon: '',
	sizePreset: '16:9',
	width: '1280',
	height: '720'
};

const devIconsUrl = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json"

class Editor extends React.Component {


	state = defaultSettings;
	componentDidMount() {
		// console.log("Mount")
		fetch(devIconsUrl).then(r => r.json()).then(data => {
			data.unshift({ name: 'custom-upload', displayName: '上传自定义图标' })
			this.setState({
				devIconOptions: data.map(item => ({
					'value': item.name,
					'label': item.displayName || item.name
				}))
			})
		})
	}
	handleReset = () => {
		this.setState({
			...defaultSettings,
			devIconOptions: this.state.devIconOptions,
		});
	};

	handleSizePresetChange = (event) => {
		const value = event.target.value;
		if (value === 'custom') {
			this.setState({ sizePreset: value });
			return;
		}

		const selectedPreset = SIZE_PRESETS.find(item => item.value === value);
		if (selectedPreset) {
			this.setState({
				sizePreset: selectedPreset.value,
				width: selectedPreset.width,
				height: selectedPreset.height,
			});
		}
	};

	handleDimensionChange = (field, value) => {
		this.setState({ [field]: value });
	};

	getRandomTheme = (theme, Pattern) => {
		this.setState({ bgColor: theme.bgColor, borderColor: theme.bdColor, pattern: Pattern });
	}

	formatOptionLabel = ({ value, label }) => (
		<div className="flex">
			<span className="mr-2">{label}</span>
			<div className="ml-auto mr-2">
				<i className={`devicon-${value}-plain dev-icon text-2xl`}></i>
			</div>
		</div>
	);



	render() {
		return (
			<div className="flex flex-col h-screen">
				<Header />

				<ImgProvider>
					<div className="flex md:flex-row flex-col flex-1 overflow-hidden">

						<div className="bg-white flex flex-col md:w-3/12 md:min-w-[300px] md:max-w-[400px] overflow-y-auto flex-shrink-0 h-full border-dashed border-r-2 border-gray-100">
							<div className="w-full p-4 space-y-4">
								<div className="flex flex-col">
									<span className="font-medium text-sm pb-2">文章标题</span>
									<textarea
										type="text"
										value={this.state.title}
										placeholder="在此输入标题"
										className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base rounded p-2.5 h-24 resize-none"
										onChange={(e) => this.setState({ title: e.target.value })}
									/>
								</div>

								<div className="flex flex-col">
									<span className="font-medium text-sm pb-2">作者</span>
									<input
										type="text"
										value={this.state.author}
										placeholder="输入作者名称"
										className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base rounded p-2.5"
										onChange={(e) => this.setState({ author: e.target.value })}
									/>
								</div>

								<div className="flex flex-col">
									<span className="font-medium text-sm pb-2">图标</span>
									<Select value={this.state.icon}
										onChange={(selectedOption) => this.setState({ icon: selectedOption })}
										options={this.state.devIconOptions}
										formatOptionLabel={this.formatOptionLabel}
										className="outline-none focus:outline-none items-center text-base text-gray-700"
									/>
								</div>
								
								{this.state.icon.value === 'custom-upload' && (
									<div className="flex flex-col items-center justify-center">
										<label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors duration-300">
											<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
											</svg>
											<span className="mt-2 text-sm text-gray-500">点击选择文件</span>
											<span className="text-xs text-gray-400 mt-1">支持 PNG, JPG, SVG</span>
											<input
												type="file"
												className="hidden"
												accept="image/*"
												onChange={(e) => this.setState({ 'customIcon': URL.createObjectURL(e.target.files[0]) })}
											/>
										</label>
										{this.state.customIcon && (
											<div className="mt-2 text-xs text-green-600">✓ 图标已上传</div>
										)}
									</div>
								)}

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col">
										<span className="font-medium text-sm pb-2">字体</span>
										<select
											value={this.state.font}
											onChange={(e) => this.setState({ font: e.target.value })}
											className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base p-2.5 rounded">
											<option>font-serif</option>
											<option>font-sans</option>
											<option>font-mono</option>
											<option>font-Inter</option>
											<option>font-Poppins</option>
											<option>font-Anek</option>
										</select>
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-sm pb-2">颜色</span>
										<div className="h-[42px] border border-gray-300 rounded flex items-center p-1 focus-within:ring-2 focus-within:ring-blue-300">
											<input type="color" value={this.state.bgColor}
												onChange={(e) => this.setState({ bgColor: e.target.value })}
												className="h-full w-full rounded cursor-pointer"
											/>
										</div>
									</div>
								</div>

								<div className="flex flex-col">
									<span className="font-medium text-sm pb-2">尺寸</span>
									<select
										onChange={this.handleSizePresetChange}
										value={this.state.sizePreset}
										className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base p-2.5 rounded">
										{
											SIZE_PRESETS.map(preset => (
												<option key={preset.value} value={preset.value}>{preset.label}</option>
											))
										}
										<option value="custom">自定义</option>
									</select>
									<span className="text-xs text-gray-500 mt-1.5">当前尺寸：{this.state.width || '—'} × {this.state.height || '—'} px</span>
								</div>

								{this.state.sizePreset === 'custom' && (
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col">
											<span className="font-medium text-sm pb-2">宽度 (px)</span>
											<input
												type="number"
												min="1"
												value={this.state.width}
												onChange={(e) => this.handleDimensionChange('width', e.target.value)}
												className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base rounded p-2.5"
											/>
										</div>
										<div className="flex flex-col">
											<span className="font-medium text-sm pb-2">高度 (px)</span>
											<input
												type="number"
												min="1"
												value={this.state.height}
												onChange={(e) => this.handleDimensionChange('height', e.target.value)}
												className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 text-gray-700 text-base rounded p-2.5"
											/>
										</div>
									</div>
								)}

								<button
									className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white rounded-lg mt-2 text-base py-2.5 px-4 transition-colors duration-200"
									onClick={this.handleReset}>
									<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24" ><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
									<span className="font-Inter font-medium">全部重置</span>
								</button>
							</div>
						</div>

						{/* cover image preview */}

						<div className="flex-1 min-w-0 max-w-full m-2 flex flex-col items-center justify-center overflow-auto p-4">

							<ComponentToImg downloadAs={this.state.download}>
								<CoverImage {...this.state} />
							</ComponentToImg>
						</div>

						{/* themes section */}

						<div className="md:w-60 md:min-w-[240px] md:max-w-[320px] border-dashed border-l-2 border-gray-100 bg-white flex-shrink-0 h-full flex flex-col">
							<div className="flex items-center p-4 flex-shrink-0">
								<h2 className="text-lg pl-2 font-inter font-semibold">主题</h2>
								<div className="ml-auto mr-1 p-2">
									<RandomTheme onThemeChange={this.getRandomTheme} />
								</div>
							</div>

							<div className="flex-1 overflow-y-auto px-4 pb-4">
								<div className="flex gap-2 flex-wrap justify-center">

									{
										THEMES.map(themePlaceholder => (
											<div className={`${themePlaceholder.label === this.state.theme ? 'border-blue-400 border-2' : ''}`} key={themePlaceholder.label}>


												<img src={themePlaceholder.preview} alt={themePlaceholder.label}
													onClick={(e) => this.setState({ theme: themePlaceholder.label })}
													className=" cursor-pointer border border-gray-100 hover:border-gray-200 hover:scale-105 duration-300 "
												/>
											</div>
										))
									}

								</div>
							</div>
						</div>

					</div>
				</ImgProvider>
			</div>

		);
	}
}

export default Editor;
