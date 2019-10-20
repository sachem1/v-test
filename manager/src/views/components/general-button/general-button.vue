<template>
	<div class="generalButton">
		<Row style="padding: 5px 0">
			<div style="float: left;">
				<span v-if="displayAdd"
							style="margin: 0 2px;">
					<Button type="primary"
									icon="md-add"
									@click="prepareAdd">添加</Button>
				</span>
				<span v-if="displayEdit"
							style="margin: 0 2px;">
					<Button type="primary"
									:disabled="updateButtonDisabled"
									icon="md-create"
									@click="prepareEdit">编辑</Button>

				</span>
				<Poptip v-if="displayBatchDelete"
								confirm
								title="您确定要批量删除数据吗?"
								placement="bottom"
								@on-ok="batchDelete">
					<span style="margin: 0 2px;">
						<Button ref="batchDeleteButton"
										:disabled="batchDeleteButtonDisabled"
										type="primary"
										icon="md-trash">删除</Button>
					</span>
				</Poptip>
				<span style="margin: 0 2px;"
							v-if="displayImportExport">
					<Poptip placement="bottom"
									width="400">
						<Button type="info"
										icon="md-cloud-download">导入</Button>
						<div class="api"
								 slot="content">
							<div style="padding: 2px 0px;">
								<p style="color:red">下载模板:
									<ul>
										<li v-for="item in templateUrl"
												:key='item.name'><a :href='item.url'>{{item.name}} </a></li>
									</ul>
								</p>
							</div>
							<div class="ivu-upload ivu-upload-drag"
									 @click="handleUploadClick"
									 @drop.prevent="onUploadDrop"
									 @dragover.prevent="dragOver = true"
									 @dragleave.prevent="dragOver = false">
								<input type="file"
											 ref="importingFile"
											 v-on:change="prepareImportFile" />
								<div style="padding: 2px 0px; ">
									<i class="ivu-icon ivu-icon-ios-cloud-upload"
										 style="font-size: 52px; color: rgb(51, 153, 255);"></i>
									<p>点击或将文件拖拽到这里上传</p>
								</div>
							</div>
							<div style="margin-top: 2px; overflow: hidden;">
								{{fileName}}
								<Button type="primary"
												size="small"
												@click="handleImportFile"
												:disabled="importSubmitButtonDisabled"
												style="float: right">确定</Button>
							</div>
						</div>
					</Poptip>
				</span>
				<span style="margin: 0 2px;"
							v-if="displayImportExport">
					<Button type="info"
									:disabled="batchDeleteButtonDisabled"
									icon="md-cloud-upload"
									@click="exportFile">导出</Button>
				</span>
				<span style="margin: 0 2px;"
							v-if="displayImportExport">
					<Button type="info"
									:disabled="batchDeleteButtonDisabled"
									icon="md-print"
									@click="handlePrint">打印</Button>
				</span>
			</div>
		</Row>
	</div>
</template>

<script>
	export default {
		name: "GeneralButton",
		data () {
			return {
				fileData: null,
				importErrors: [],
				templateUrl: [
					{ name: '测试模板1', url: 'http://localhost:12329/export/2019-05-2809_16_40.xlsx' },
					{ name: '测试模板2', url: 'http://localhost:12329/export/2019-05-2809_16_40.xlsx' }
				]
			};
		},
		props: {
			displayAdd: {
				type: Boolean
			},
			displayEdit: {
				type: Boolean
			},
			displayBatchDelete: {
				type: Boolean
			},
			displayImportExport: {
				type: Boolean
			},
			displayEdit: {
				type: Boolean
			},
			selectedRows: { type: Array },
			buttonHandleSetting: Object,
			buttonBus: Object,
			routerSetting: Object
		},
		methods: {
			prepareAdd () {

				if (this.routerSetting && this.routerSetting.routeName) {
					this.$router.push({
						name: this.routerSetting.routeName,
						query: this.buildRouteParameters(this.routerSetting.routeParams)
					});
				} else {
					this.buttonBus.$emit("prepareAdd");
				}
				this.$Message.success("新增");
			},
			prepareEdit () {
				// if (this.routerSetting && this.routerSetting.routeName) {
				//   this.$router.push({
				//     name: this.routerSetting.routeName,
				//     query: this.buildRouteParameters(this.routerSetting.routeParams)
				//   });
				// } else {
				this.buttonBus.$emit("prepareEdit");
				//}
				this.$Message.success("编辑");
			},
			buildRouteParameters (routeParams) {

				var parameters = {};
				if (routeParams) {
					var vm = this;
					routeParams.forEach(routeParam => {
						parameters[routeParam.keyName] =
							vm.$route.query[routeParam.valueField] || routeParam.defaultValue;
					});
				}
				return parameters;
			},
			async batchDelete () {
				if (this.selectedRows.length == 0) return;

				var selectedIds = this.selectedRows.map(item => {
					if (item.id) {
						return item.id;
					} else {
						return item.Id;
					}
				});
				let vm = this;
				var deleteSetting = vm.buttonHandleSetting;
				console.log(JSON.stringify(deleteSetting));
				await vm.$store.dispatch({
					serviceName: deleteSetting.serviceName,
					type: deleteSetting.deleteUrl,
					data: { ids: selectedIds }
				});
				vm.buttonBus.$emit("requestData");
				vm.$Message.success({ content: "已成功删除！", duration: 5 });
			},
			handleUploadClick () {
				this.$refs.importingFile.click();
			},
			async handleImportFile () {
				let formData = new FormData();
				var importSetting = this.buttonHandleSetting;
				formData.append("file", this.fileData);
				this.importErrors = await this.$store.dispatch({
					serviceName: importSetting.serviceName,
					type: importSetting.importUrl,
					data: formData
				});

				if (this.importErrors.Result !== "") {
					this.$Message.error({ content: "导入失败！", duration: 5 });
				} else {
					this.buttonBus.$emit("requestData");
					this.$Message.success({
						content: "成功导入！",
						duration: 5
					});
					this.fileData = null;
					this.$refs.importingFile.value = null;
				}
			},
			prepareImportFile (e) {
				const files = e.target.files;

				if (!files) {
					return;
				}

				this.saveLocalFile(files[0]);
			},
			saveLocalFile (file) {
				this.fileData = file;
				this.importErrors.splice(0, this.importErrors.length);
			},
			async exportFile1 () {
				if (this.selectedRows.length == 0) return;

				var selectedIds = this.selectedRows.map(item => {
					if (item.id) {
						return item.id;
					} else {
						return item.Id;
					}
				});

				var vm = this;
				var exportSetting = vm.buttonHandleSetting;

				var response = await vm.$store.dispatch({
					serviceName: exportSetting.serviceName,
					type: exportSetting.exportUrl,
					data: { ids: selectedIds }
				});

				var headers = response.headers;
				//var blob = new Blob([response.data], { type: headers["content-type"] });
				var blob = new Blob([response.data], {
					type:
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				});
				var link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				// link.download = headers["content-disposition"]
				//   .split(";")[1]
				//   .trim()
				//   .replace("filename=", "");
				link.download = "test";
				link.click();
			},
			async exportFile () {
				if (this.selectedRows.length == 0) return;

				var selectedIds = this.selectedRows.map(item => {
					if (item.id) {
						return item.id;
					} else {
						return item.Id;
					}
				});

				var vm = this;
				var exportSetting = vm.buttonHandleSetting;

				var response = await vm.$store.dispatch({
					serviceName: exportSetting.serviceName,
					type: exportSetting.exportUrl,
					data: { ids: selectedIds }
				});

				window.location.href = response.Result;
			},
			handlePrint () {
				this.$print(this.$refs.print);
			},
			parpareTemplate () {
				var setting = this.buttonHandleSetting;

				let param = 1;
				this.$store
					.dispatch({
						serviceName: setting.serviceName,
						type: setting.templateUrl,
						data: param
					})
					.then(res => {

						this.template = res.data.Result;
					})
					.catch(error => {
						this.$Message.error("获取模板失败!");
					});
			}
		},
		created () {
			//this.bus.$on('prepareAdd',prepareAdd);
		},
		computed: {
			rows: function () {
				var result = [];
				if (this.selectedRows == undefined) return result;

				this.selectedRows.forEach(item => {
					result.push(item);
				});
				return result;
			},
			updateButtonDisabled: function () {
				return this.rows.length !== 1;
			},
			batchDeleteButtonDisabled: function () {
				return this.rows == null || this.rows.length == 0;
			},
			importSubmitButtonDisabled: function () {
				if (this.fileData) return false;

				return true;
			},
			fileName: function () {
				if (this.fileData) return this.fileData.name;

				return null;
			}
		},
		watch: {
			selectedRows: function (newValue) {
				this.selectedRows = newValue;
				console.log("选中了:" + JSON.stringify(newValue));
			}
		}
	};
</script>
