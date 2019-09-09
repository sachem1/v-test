param(
    [Parameter(Mandatory = $true)]
    $version
)

docker build -t dispatcher-ui:$version -f $PSScriptRoot\Dockerfile .

docker tag dispatcher-ui:$version caad-registry-cn-north-1.jcr.service.jdcloud.com/dispatcher-ui:$version

docker push caad-registry-cn-north-1.jcr.service.jdcloud.com/dispatcher-ui:$version

