import os
import json
from pathlib import Path

sl_path = r"c:\Users\Tejteju\Downloads\signmaster-asl-dictionary (1)\archive (3)\dataset\SL"

# Get all word folders
words = sorted([d for d in os.listdir(sl_path) if os.path.isdir(os.path.join(sl_path, d))])

# Template for each word with video support
def generate_entry(word):
    word_path = os.path.join(sl_path, word)
    
    # Find first video file in word folder
    video_src = None
    try:
        files = sorted(os.listdir(word_path))
        mp4_files = [f for f in files if f.endswith('.mp4')]
        if mp4_files:
            # Use the first video file, reference from /archive context
            video_name = mp4_files[0]
            video_src = f"/archive (3)/dataset/SL/{word}/{video_name}"
    except:
        pass
    
    # Build the entry
    entry = f'''  "{word}": {{'''
    
    if video_src:
        entry += f'''
    videoSrc: "{video_src}",'''
    
    entry += f'''
    description: "Sign for {word}. This sign is commonly used in American Sign Language (ASL) to express the concept of '{word}'.",
    handshape: "Various hand shapes",
    movement: "Fluid motion",
    location: "Chest height",
    tips: [
      "Practice the handshape carefully.",
      "Keep the movement smooth and natural."
    ]
  }},
'''
    
    return entry

# Generate the database entries
entries = "".join([generate_entry(word) for word in words])

# Read the current file template
template = '''
export interface SignInfo {
  youtubeId?: string;
  youtubeUrl?: string;
  videoSrc?: string;
  description: string;
  handshape: string;
  movement: string;
  location: string;
  tips: string[];
}

export const SIGN_DATABASE: Record<string, SignInfo> = {
'''

closing = '''
};

export const POPULAR_SIGNS = Object.keys(SIGN_DATABASE);
'''

# Write the output file
output_path = r"c:\Users\Tejteju\Downloads\signmaster-asl-dictionary (1)\constants.tsx"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(template)
    f.write(entries)
    f.write(closing)

print(f"Generated constants.tsx with {len(words)} words and video sources")
print(f"Output saved to: {output_path}")

# Count how many have videos
video_count = sum(1 for word in words if any(f.endswith('.mp4') for f in os.listdir(os.path.join(sl_path, word))))
print(f"Total words with videos: {video_count}")
