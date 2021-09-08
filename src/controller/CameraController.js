export function TranslateToTarget(camera, target) {
    if(target.alpha && target.beta) {
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        var cameraTarget = { beta: camera.beta, alpha: camera.alpha };
        var tween = new TWEEN.Tween(cameraTarget)
        .to(target, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            camera.beta = cameraTarget.beta;
            camera.alpha = cameraTarget.alpha;
        })
        .start();
    }
}