<template>
    <div>
        <Modal v-model="modalShow" title="导入" @on-ok="ok" @on-cancel="cancel">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="Password" prop="passwd">
                    <Input type="password" v-model="formCustom.passwd"></Input>
                </FormItem>
                <FormItem label="Confirm" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck"></Input>
                </FormItem>
                <FormItem label="Age" prop="age">
                    <Input type="text" v-model="formCustom.age"></Input>
                </FormItem>
                <FormItem>
                    <Upload
                        :before-upload="handleUpload"
                        action="//jsonplaceholder.typicode.com/posts/"
                    >
                        <Button icon="ios-cloud-upload-outline">点击选择需要导入的文件</Button>
                    </Upload>

                    <Button type="primary">Primary</Button>
                    <div v-if="file !== null">
                        Upload file: {{ file.name }}
                        <Button
                            type="text"
                            @click="upload"
                            :loading="loadingStatus"
                        >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "it-record-import",
    data() {
        return {
            //modalShow: false
        };
    },
    props: {
        modalShow:{
            default:true
        }
    },
    methods: {
        handleSearch() {
            this.$emit("searchList", this.searchModel);
        }
    }
};
</script>
