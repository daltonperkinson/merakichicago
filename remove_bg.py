import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_background(input_path, output_path, bg_color=(26, 10, 13), tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # Check if the pixel is close to the background color
        if abs(item[0]-bg_color[0]) < tolerance and abs(item[1]-bg_color[1]) < tolerance and abs(item[2]-bg_color[2]) < tolerance:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            # Maybe apply a slight anti-aliasing gradient if it's borderline, but strict is fine for now
            newData.append(item)
    
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_background('/Users/daltonperkinson/.gemini/antigravity/scratch/meraki-chicago/public/meraki_logo.png', '/Users/daltonperkinson/.gemini/antigravity/scratch/meraki-chicago/public/meraki_logo.png')
print("Transparency processing complete.")
