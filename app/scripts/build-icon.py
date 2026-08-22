import base64
import json
import struct
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
RES = REPO / "resources"

ICO_SIZES = [16, 32, 48, 64, 128, 256]


def load_pngs(src: Path) -> dict[int, bytes]:
    raw = json.loads(src.read_text(encoding="utf-8"))
    if isinstance(raw, list):
        raw = json.loads(raw[0]["text"])
    pngs = raw["pngs"]
    return {int(s): base64.b64decode(pngs[str(s)]) for s in ICO_SIZES}


def build_ico(pngs: dict[int, bytes]) -> bytes:
    entries = [(s, pngs[s]) for s in ICO_SIZES]
    count = len(entries)
    header = struct.pack("<HHH", 0, 1, count)
    offset = 6 + count * 16
    directory = b""
    payload = b""
    for size, data in entries:
        w = 0 if size >= 256 else size
        h = 0 if size >= 256 else size
        directory += struct.pack(
            "<BBBBHHII",
            w, h,        
            0,           
            0,           
            1,           
            32,          
            len(data),   
            offset,      
        )
        payload += data
        offset += len(data)
    return header + directory + payload


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/build-icon.py <tool-result.json>")
    src = Path(sys.argv[1])
    pngs = load_pngs(src)
    RES.mkdir(parents=True, exist_ok=True)

    ico = build_ico(pngs)
    (RES / "icon.ico").write_bytes(ico)
    (RES / "icon.png").write_bytes(pngs[256])

    print(f"icon.ico  {len(ico):>8} bytes  ({', '.join(map(str, ICO_SIZES))})")
    print(f"icon.png  {len(pngs[256]):>8} bytes  (256x256)")


if __name__ == "__main__":
    main()